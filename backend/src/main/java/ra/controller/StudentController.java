package ra.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import ra.model.Student;
import ra.model.User;
import ra.repository.IStudentRepository;
import ra.repository.UserRepository;
import ra.service.user.IUserService;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/v1/api")
@CrossOrigin("*")
@RequiredArgsConstructor
public class StudentController {


    private final IUserService userService;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private IStudentRepository studentRepository;

    @PutMapping("/update")
    public ResponseEntity<?> updateStudent(@RequestBody User user){
        User update = userRepository.findById(user.getId()).get();
        if (update == null){
            return new ResponseEntity<>("Update error",HttpStatus.NOT_FOUND);
        }
        update.setName(user.getName());
        update.setAvatar(user.getAvatar());
        update.setAddress(user.getAddress());
        update.setPhoneNumber(user.getPhoneNumber());
        update.setBirthDate(user.getBirthDate());
        update.setUsername(user.getUsername());
        update.setEmail(user.getEmail());
        userRepository.save(update);
        return new ResponseEntity<>("Update success",HttpStatus.OK);
    }

    @DeleteMapping("/delete/{id}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public void deleteStudent(@PathVariable String id){
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
    @GetMapping("/student")
    public Student createNewStudent(@RequestBody Student student){
        return studentRepository.save(student);
    }
}
