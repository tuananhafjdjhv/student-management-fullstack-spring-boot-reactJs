package ra.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ra.model.Teacher;

public interface ITeacherRepository extends JpaRepository<Teacher,Long> {
}
