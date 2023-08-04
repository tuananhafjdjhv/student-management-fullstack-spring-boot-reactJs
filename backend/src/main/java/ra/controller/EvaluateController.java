package ra.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import ra.dto.EvaluateDTO;
import ra.dto.reponse.ResponseMessage;
import ra.dto.request.EvaluateForm;
import ra.model.Evaluate;
import ra.model.Student;
import ra.repository.IEvaluateRepository;
import ra.repository.IStudentRepository;
import ra.service.evaluate.IEvaluateService;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/v1/api/evaluate")
public class EvaluateController {
    @Autowired
    private IEvaluateRepository evaluateRepository;
    @Autowired
    private IEvaluateService evaluateService;
    @Autowired
    private  IStudentRepository studentRepository;
    @GetMapping("/student/{id}")
    @Transactional
    public List<EvaluateDTO> findEvaluateByStudentId(@PathVariable Long id){
      return   evaluateService.findEvaluateByStudentId(id);
    }

    /**
     *
     * @param : evaluate, studentId
     *            studentService.findById(studentId)
     * @return
     */
    @PostMapping("/create")
    public ResponseEntity<ResponseMessage> createEvaluate(@RequestBody EvaluateForm evaluate){
        Student student = studentRepository.findById(evaluate.getStudentId()).get();
        Evaluate evaluate1 = Evaluate.builder()
                .student(student)
                .evaluate(evaluate.getEvaluate())
                .build();
        return ResponseEntity.ok().body(
                ResponseMessage.builder()
                        .status("Ra rồi")
                        .message("Evaluate created successfully!")
                        .data(evaluateRepository.save(evaluate1))
                        .build());
    }
}
