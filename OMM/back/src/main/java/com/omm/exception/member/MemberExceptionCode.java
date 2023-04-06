package com.omm.exception.member;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
@AllArgsConstructor
public enum MemberExceptionCode {

    MEMBER_NOT_EXISTS(HttpStatus.NOT_FOUND, "존재하지 않는 회원입니다."),
    
    MEMBER_ALREADY_EXIST(HttpStatus.BAD_REQUEST, "이미 존재하는 회원입니다."),

    MEMBER_INPUT_TYPE_WRONG(HttpStatus.BAD_REQUEST, "입력 정보가 잘못되었습니다."),

    MEMBER_INFO_NOT_EXISTS(HttpStatus.NOT_FOUND, "회원 정보가 존재하지 않습니다."),

    MEMBER_FILTERING_NOT_EXISTS(HttpStatus.NOT_FOUND, "회원 필터링 정보가 존재하지 않습니다."),

    MEMBER_IMAGE_UPLOAD_FAILED(HttpStatus.BAD_REQUEST,"사진 등록에 실패했습니다."),

    MEMBER_IMAGE_DELETE_FAILED(HttpStatus.CONFLICT,"사진 삭제에 실패했습니다."),

    MEMBER_INTEREST_DELETE_FAILED(HttpStatus.CONFLICT,"관심사 삭제에 실패했습니다."),

    MEMBER_INPUT_MAX_EXCEED(HttpStatus.BAD_REQUEST,"갯수 제한을 초과했습니다.")
    ;

    private final HttpStatus httpStatus;
    private final String detail;
}
