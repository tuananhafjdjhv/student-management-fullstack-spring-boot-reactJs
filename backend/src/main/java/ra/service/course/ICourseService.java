package ra.service.course;

import ra.dto.CourseDTO;

import java.util.List;

public interface ICourseService {
   List<CourseDTO> findAllCourse();
}
