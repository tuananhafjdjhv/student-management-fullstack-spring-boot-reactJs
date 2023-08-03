package ra.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import ra.dto.CourseDTO;
import ra.dto.reponse.ResponseMessage;
import ra.model.Course;
import ra.repository.ICourseRepository;
import ra.service.course.ICourseService;

import java.util.List;

@RestController
@RequestMapping("/v1/api/course")
public class CourseController {
    @Autowired
    private ICourseRepository courseRepository;
    @Autowired
    private ICourseService courseService;
    @GetMapping("/show-all")
    @Transactional
    public List<CourseDTO> showAll(){
        return courseService.findAllCourse();
    }
    @PostMapping("/create")
    public ResponseEntity<Course> createCourse(@RequestBody Course  course){
        return new ResponseEntity<>(courseRepository.save(course),HttpStatus.OK);
    }
    @PutMapping("/updateCourse")
    public ResponseEntity<?> updateCourse(@RequestBody Course course){
        Course update = courseRepository.findById(course.getCourseId()).get();
        if (update == null){
            return  new ResponseEntity<>("Update error",HttpStatus.NOT_FOUND);
        } else {
            update.setCourseName(course.getCourseName());
            update.setDescription(course.getDescription());
            update.setImage(course.getImage());
//            update.setStatus(course.isStatus());
            courseRepository.save(update);
            return new ResponseEntity<>("Update success",HttpStatus.OK);
        }

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
