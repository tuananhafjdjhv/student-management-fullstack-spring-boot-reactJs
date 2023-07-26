package ra.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ra.dto.reponse.ResponseMessage;
import ra.model.UserData;
import ra.repository.IUserDataRepository;

import java.util.List;

@RestController
@RequestMapping("/v1/api")
public class UserDataController {
    @Autowired
    private IUserDataRepository userDataRepository;
    @PostMapping("/save-data")
    public ResponseEntity<UserData> createUserData(@RequestBody UserData userData){
        return new ResponseEntity<>(userDataRepository.save(userData), HttpStatus.OK);
    }
    @GetMapping("/user/all-data")
    public ResponseEntity<List<UserData>> findAll(){
        return new ResponseEntity<>(userDataRepository.findAll(),HttpStatus.OK);
    }
    @DeleteMapping("/user/deleteAll")
    public ResponseEntity<ResponseMessage> deleteAllUsers(){
        userDataRepository.deleteAll();
        return new ResponseEntity<>(HttpStatus.OK);
    }
    @DeleteMapping("/deleteUserData/{id}")
    public void deleteById(@PathVariable String id){
        userDataRepository.deleteById(Long.valueOf(id));
    }
}
