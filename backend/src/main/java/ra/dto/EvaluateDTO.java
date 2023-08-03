package ra.dto;

import lombok.*;
import ra.model.Student;

import javax.persistence.JoinColumn;
import javax.persistence.Lob;
import javax.persistence.ManyToOne;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class EvaluateDTO {
    private Long id;
    private  String evaluate;

    private Long studentId;
}
