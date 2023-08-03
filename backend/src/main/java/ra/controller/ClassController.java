package ra.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import ra.dto.ClassDTO;
import ra.dto.StudentDTO;
import ra.model.Class;
import ra.model.Course;
import ra.repository.IClassRepository;
import ra.repository.IStudentRepository;
import ra.service.clazz.IClassService;
import ra.service.student.IStudentService;

import java.util.List;

@RestController
@RequestMapping("/v1/api")
@CrossOrigin("*")
@RequiredArgsConstructor
public class ClassController {
    @Autowired
    private IStudentRepository studentRepository;
    @Autowired
    private   IStudentService studentService;

    @Autowired
    private IClassRepository classRepository ;
    @Autowired
    private IClassService classService;

    @GetMapping("/class/{id}")
    @Transactional
    public List<StudentDTO>  findStudentByClass(@PathVariable Long id){
        return studentService.findByClassId(id);
    }


    @GetMapping("/class-all")
    @Transactional
    public ResponseEntity<List<ClassDTO>> showAll(){
        return new ResponseEntity<>(classService.findAllClass(), HttpStatus.OK);
    }

}
