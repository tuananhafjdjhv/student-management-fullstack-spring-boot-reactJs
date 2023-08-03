package ra.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import ra.dto.EvaluateDTO;
import ra.model.Evaluate;
import ra.repository.IEvaluateRepository;
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
    @GetMapping("/student/{id}")
    @Transactional
    public List<EvaluateDTO> findEvaluateByStudentId(@PathVariable Long id){
      return   evaluateService.findEvaluateByStudentId(id);
    }
    @PostMapping("/create")
    public Evaluate createEvaluate( @RequestBody Evaluate evaluate){
        return evaluateRepository.save(evaluate);
    }
}
