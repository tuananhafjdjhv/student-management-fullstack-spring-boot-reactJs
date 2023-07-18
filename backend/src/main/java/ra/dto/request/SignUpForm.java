package ra.dto.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import ra.model.Provider;


import javax.persistence.Lob;
import java.time.LocalDate;
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

    private LocalDate birthDate;

    private Set<String> roles;

    private Provider provider ;
}
