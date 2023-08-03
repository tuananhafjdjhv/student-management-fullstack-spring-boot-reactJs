package ra.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import ra.dto.CourseDTO;
import ra.dto.EvaluateDTO;

import javax.persistence.*;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
@NamedStoredProcedureQuery(name = "find_evaluate_by_student_id",
        procedureName = "find_evaluate_by_student_id", parameters = {
        @StoredProcedureParameter(mode = ParameterMode.IN, name = "studentId", type = Long.class)},
        resultSetMappings = "find_evaluate_by_student_id"
)
@SqlResultSetMapping(name = "find_evaluate_by_student_id",
        classes = @ConstructorResult(
                targetClass = EvaluateDTO.class,
                columns = {
                        @ColumnResult(name = "id", type = Long.class),
                        @ColumnResult(name = "evaluate", type = String.class),
                        @ColumnResult(name = "studentId", type = Long.class),
                }
        )
)
public class Evaluate {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Lob
    private  String evaluate;

    @ManyToOne
    @JoinColumn(name = "studentId")
    private Student student;
}
