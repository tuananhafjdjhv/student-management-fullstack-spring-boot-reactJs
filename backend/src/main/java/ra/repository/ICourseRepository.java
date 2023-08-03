package ra.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.query.Procedure;
import org.springframework.stereotype.Repository;
import ra.dto.CourseDTO;
import ra.model.Course;

import java.util.List;

@Repository
public interface ICourseRepository extends JpaRepository<Course,Long> {
    @Procedure(name = "find_all_course")
    List<CourseDTO> findAllCourse();
}
