package ra;

import org.modelmapper.ModelMapper;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.oauth2.provider.token.TokenStore;
import org.springframework.security.oauth2.provider.token.store.JwtTokenStore;

@SpringBootApplication
public class StudentManagementApplication {
	@Bean
	public ModelMapper modelMapper() {
		return new ModelMapper();
	}


	public static void main(String[] args) {
		SpringApplication.run(StudentManagementApplication.class, args);
	}
}
