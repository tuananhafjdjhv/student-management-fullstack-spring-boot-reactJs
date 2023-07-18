package ra.security.userPrincipal;




import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import ra.model.User;


import java.time.LocalDate;
import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserPrincipal implements UserDetails {
    private Long id;
    private String name;
    private String address;
    private String avatar;
    private String email;
    private String phoneNumber;
    @JsonIgnore
    private String password;
    private String username;
    private LocalDate birthDate;
    private boolean status;
    private Collection<? extends GrantedAuthority>  roles;

    public static UserPrincipal build(User user) {

         List<GrantedAuthority> grantedAuthorities = user.getRoles().stream().map(
                role -> new SimpleGrantedAuthority(role.getName().name())
        ).collect(Collectors.toList());
        return UserPrincipal.builder()
                .id(user.getId())
                .name(user.getName())
                .username(user.getUsername())
                .password(user.getPassword())
                .address(user.getAddress())
                .email(user.getEmail())
                .avatar(user.getAvatar())
                .birthDate(user.getBirthDate())
                .phoneNumber(user.getPhoneNumber())
                .address(user.getAddress())
                .status(user.isStatus())
                .roles(grantedAuthorities)
                .build();
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return roles;
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return username;
    }


    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}


