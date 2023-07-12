package ra.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ra.model.Course;

@Repository
public interface ICourseRepository extends JpaRepository<Course,Long> {

}
