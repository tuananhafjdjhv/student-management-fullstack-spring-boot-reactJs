package ra.dto.reponse;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.security.core.GrantedAuthority;

import java.time.LocalDate;
import java.util.Collection;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class JwtResponse {
    private String status;
    private String token;
    private String type;
    private String name;
    private String address;
    private String phoneNumber;
    private String email;
    private LocalDate birthDate;
    private String avatar;
    private Collection<? extends GrantedAuthority> roles;
}
