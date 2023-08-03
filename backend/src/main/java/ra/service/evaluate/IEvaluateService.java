package ra.service.evaluate;

import ra.dto.EvaluateDTO;
import ra.model.Evaluate;

import java.util.List;

public interface IEvaluateService {
    List<EvaluateDTO> findEvaluateByStudentId(Long studentId);
}
