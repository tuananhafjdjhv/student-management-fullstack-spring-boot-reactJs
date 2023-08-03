package ra.service.evaluate;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ra.dto.CourseDTO;
import ra.dto.EvaluateDTO;
import ra.repository.IEvaluateRepository;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class EvaluateService implements IEvaluateService{
    @Autowired
    private IEvaluateRepository evaluateRepository;
    @Autowired
    private ModelMapper modelMapper;
    @Override
    public List<EvaluateDTO> findEvaluateByStudentId(Long studentId) {
        return evaluateRepository.findEvaluateByStudentId(studentId)
                .stream().map(c ->  modelMapper.map(c, EvaluateDTO.class))
                .collect(Collectors.toList());
    }
}
