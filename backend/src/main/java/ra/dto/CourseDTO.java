package ra.dto;

import lombok.*;
import ra.model.Class;

import javax.persistence.Lob;
import java.util.List;
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CourseDTO {
    private Long courseId;
    private String courseName;
    private String image;
    private String description;
    private boolean status;
}
