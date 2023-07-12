package ra.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import ra.model.User;
import ra.repository.UserRepository;
import ra.service.user.IUserService;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/v1/api/admin")
@CrossOrigin("*")
@RequiredArgsConstructor
public class StudentController {


    private final IUserService userService;
    @Autowired
    private UserRepository userRepository;

    @PutMapping("/update")
    public User updateMovie(@RequestBody User user){
        User update = userRepository.findById(user.getId()).get();
        if (update != null){
            return userRepository.save(user);
        }
        return  null;
    }

    @DeleteMapping("/delete/{id}")
    public void deleteMovie(@PathVariable String id){
        userRepository.deleteById(Long.valueOf(id));
    }

    @GetMapping("/search/{name}")
    public ResponseEntity<List<User>> searchStudent(@PathVariable String name){
        return new ResponseEntity<>(userService.findUserByName(name), HttpStatus.OK);
    }

    @GetMapping("/student/{id}")
    public Optional<User> findById(@PathVariable Long id){
        return userRepository.findById(id);
    }
}
