package ra.dto.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;


import javax.persistence.Lob;
import java.util.Set;
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class SignUpForm {
    private String name;
    private String username;
    private String email;
    private String password;
    @Lob
    private String avatar;

    private String address;

    private String phoneNumber;

    private String birthDate;

    private Set<String> roles;
}
