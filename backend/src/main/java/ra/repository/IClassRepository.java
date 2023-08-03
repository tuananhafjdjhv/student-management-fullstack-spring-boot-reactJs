package ra.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.query.Procedure;
import org.springframework.stereotype.Repository;
import ra.dto.ClassDTO;
import ra.model.Class;

import java.util.List;

@Repository
public interface IClassRepository extends JpaRepository<Class,Long> {
//    @Query(value = "select class_id classId,class_name className, teacher_id teacherId from class",nativeQuery = true)
    @Procedure(name = "find_all_class")
    List<ClassDTO> findAllClass();
}
