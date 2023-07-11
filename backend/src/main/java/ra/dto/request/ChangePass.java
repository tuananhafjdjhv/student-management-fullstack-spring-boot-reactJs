package ra.dto.request;

import lombok.Data;

@Data
public class ChangePass {
    private String oldPass;
    private String newPass;
    private String rePass;
}
