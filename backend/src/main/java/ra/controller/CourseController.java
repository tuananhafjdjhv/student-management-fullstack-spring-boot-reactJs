package ra.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ra.dto.reponse.ResponseMessage;
import ra.model.Course;
import ra.repository.ICourseRepository;

import java.util.List;

@RestController
@RequestMapping("/v1/api/course")
public class CourseController {
    @Autowired
    private ICourseRepository courseRepository;
    @GetMapping("/show-all")
    public ResponseEntity<List<Course>> showAll(){
        return new ResponseEntity<>(courseRepository.findAll(), HttpStatus.OK);
    }
    @PostMapping("/create")
    public ResponseEntity<Course> createCourse(@RequestBody Course  course){
        return new ResponseEntity<>(courseRepository.save(course),HttpStatus.OK);
    }
    @PutMapping("/update")
    public ResponseEntity<Course> updateCourse(@RequestBody Course course){
        Course update = courseRepository.findById(course.getCourseId()).get();
        if (update != null){
             courseRepository.save(course);
        }
        return  null;
    }
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<ResponseMessage> deleteCourse(@PathVariable Long id){
        courseRepository.deleteById(id);
        return new ResponseEntity<>(new ResponseMessage("OK","Update success",null),HttpStatus.OK);
    }
    @GetMapping("/course/{id}")
    public Course findById(@PathVariable Long id){
        return   courseRepository.findById(id).get();

    }
}
