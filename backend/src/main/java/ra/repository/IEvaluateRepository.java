package ra.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.query.Procedure;
import org.springframework.stereotype.Repository;
import ra.dto.EvaluateDTO;
import ra.model.Evaluate;

import java.util.List;

@Repository
public interface IEvaluateRepository extends JpaRepository<Evaluate,Long> {
//    @Query(value = "select id,evaluate,student_id as studentId from Evaluate  where student_id =:studentId",nativeQuery = true)
    @Procedure(name = "find_evaluate_by_student_id")
    List<EvaluateDTO> findEvaluateByStudentId(Long studentId);
}
