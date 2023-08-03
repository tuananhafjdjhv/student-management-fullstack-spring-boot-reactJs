package ra.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.query.Procedure;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import ra.dto.StudentDTO;
import ra.model.Class;
import ra.model.Student;
import ra.model.Teacher;

import java.util.List;

@Repository
public interface IStudentRepository extends JpaRepository<Student,Long> {


    @Procedure(name = "find_student_by_class_id")
    List<StudentDTO> findByClassId(@Param("classId") Long classId);


}
