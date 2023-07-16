//package ra.security.userPrincipal;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.security.core.authority.SimpleGrantedAuthority;
//import org.springframework.security.core.context.SecurityContextHolder;
//import org.springframework.security.core.userdetails.UserDetails;
//import org.springframework.security.core.userdetails.UserDetailsService;
//import org.springframework.security.core.userdetails.UsernameNotFoundException;
//import org.springframework.stereotype.Service;
//import ra.model.User;
//import ra.repository.UserRepository;
//
//@Service
//public class UserDetailServiceOauth implements UserDetailsService {
//    @Autowired
//    private UserRepository userRepository;
//    @Override
//    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
//        User user = this.userRepository.findByEmail(username).get();
//
//        if (user == null) throw new UsernameNotFoundException(String.format("No user found with username '%s'", username));
//        return (UserDetails) user;
//    }
//
//}
