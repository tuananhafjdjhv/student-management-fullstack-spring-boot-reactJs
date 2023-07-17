package ra.security.userPrincipal;



import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import ra.model.User;
import ra.repository.UserRepository;
import ra.service.user.IUserService;
import ra.service.user.UserService;

@Service
public class UserDetailService implements UserDetailsService {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private UserService userService;
    @Override
    public UserDetails loadUserByUsername(String name) throws UsernameNotFoundException {
        User user =  userRepository.findByUsername(name)
                .orElseThrow(()-> new UsernameNotFoundException("Failed -> NOT FOUND USE at username: "+name));
        return UserPrincipal.build(user);
    }
    public User getFromAuthentication(){
        UserPrincipal userPrincipal = (UserPrincipal) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return  userService.findUserById(userPrincipal.getId()).get();
    }
    public Boolean hasProtectedAccess() {
        return SecurityContextHolder.
                getContext().getAuthentication().
                getAuthorities().
                contains(new SimpleGrantedAuthority("ADMIN"));
    }
}

