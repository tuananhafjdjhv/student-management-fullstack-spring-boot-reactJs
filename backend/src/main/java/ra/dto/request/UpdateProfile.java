package ra.dto.request;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Lob;
import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UpdateProfile {
    private String name;
    private String username;
    private String email;
    @Lob
    private String avatar;

    private String address;

    private String phoneNumber;

    private LocalDate birthDate;

}
