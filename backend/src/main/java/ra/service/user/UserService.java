package ra.service.user;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
;
import ra.model.Provider;
import ra.model.User;
import ra.repository.UserRepository;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class UserService implements IUserService {
     @Autowired
    private UserRepository userRepository;
     @Autowired
     private ModelMapper modelMapper;

    @Override
    public List<User> findUserByName(String name) {
        return userRepository.findUserByNameContaining(name)
                .stream()
                .map(student -> modelMapper.map(student, User.class))
                .collect(Collectors.toList());
    }

    @Override
    public Optional<User> findByUsername(String name) {
        return userRepository.findByUsername(name);
    }

    @Override
    public Boolean existsByUsername(String username) {
        return userRepository.existsByUsername(username);
    }

    @Override
    public Boolean existsByEmail(String email) {
        return userRepository.existsByEmail(email);
    }

    @Override
    public User save(User user) {
        return userRepository.save(user);
    }

    @Override
    public List<User> findAll() {
        return userRepository.findAll();
    }

    @Override
    public Optional<User> findUserById(Long id) {
        return userRepository.findById(id);
    }
    public void processOAuthPostLogin(String username) {
        User existUser = userRepository.findByUsername(username).get();

        if (existUser == null) {
            User newUser = new User();
            newUser.setUsername(username);
            newUser.setProvider(Provider.GOOGLE);
            newUser.setStatus(true);

            userRepository.save(newUser);

            System.out.println("Created new user: " + username);
        }

    }
}
