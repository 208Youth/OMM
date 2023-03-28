package com.omm.util;

import com.omm.exception.member.MemberExceptionCode;
import com.omm.exception.member.MemberRuntimeException;
import com.omm.model.entity.enums.*;

public class EnumToKNN {

    public static double filterContactToKNN(FilterContactStyle filterContactStyle) {
        switch (filterContactStyle) {
            case NONE:
            case PREFER_FACECALL:
                return 5.0;
            case PREFER_MSG:
                return 3.0;
            case PREFER_CALL:
                return 7.0;
            case NOT_MSG:
                return 1.0;
            case PREFER_OFFLINE:
                return 9.0;
            default:
                throw new MemberRuntimeException(MemberExceptionCode.MEMBER_INPUT_TYPE_WRONG);
        }
    }

    public static double filterDrinkingToKNN(FilterDrinkingStyle filterDrinkingStyle) {
        switch (filterDrinkingStyle) {
            case NONE:
                return 5.0;
            case PREFER_NO:
                return 0.0;
            case PREFER_YES:
                return 10.0;
            default:
                throw new MemberRuntimeException(MemberExceptionCode.MEMBER_INPUT_TYPE_WRONG);
        }
    }


    public static double filterSmokingToKNN(FilterSmokingStyle filterSmokingStyle) {
        switch (filterSmokingStyle) {
            case NONE:
                return 5.0;
            case PREFER_NO:
                return 0.0;
            case PREFER_YES:
                return 10.0;
            default:
                throw new MemberRuntimeException(MemberExceptionCode.MEMBER_INPUT_TYPE_WRONG);
        }
    }

    public static double infoContactToKNN(InfoContactStyle infoContactStyle) {
        switch (infoContactStyle) {
            case PREFER_MSG:
                return 3.0;
            case PREFER_CALL:
                return 7.0;
            case PREFER_FACECALL:
                return 5.0;
            case NOT_MSG:
                return 1.0;
            case PREFER_OFFLINE:
                return 9.0;
            default:
                throw new MemberRuntimeException(MemberExceptionCode.MEMBER_INPUT_TYPE_WRONG);
        }
    }

    public static double infoDrinkingToKNN(InfoDrinkingStyle infoDrinkingStyle) {
        switch (infoDrinkingStyle) {
            case NOT:
                return 0.0;
            case SOMETIMES:
                return 4.0;
            case OFTEN:
                return 6.0;
            case EVERYDAY:
                return 10.0;
            case ONLY_FRIENDS: case STOPPING:
                return 2.0;
            default:
                throw new MemberRuntimeException(MemberExceptionCode.MEMBER_INPUT_TYPE_WRONG);
        }
    }

    public static double infoSmokingToKNN(InfoSmokingStyle infoSmokingStyle) {
        switch (infoSmokingStyle) {
            case NOT:
                return 0.0;
            case SOMETIMES:
                return 5.0;
            case OFTEN:
                return 10.0;
            case STOPPING:
                return 2.0;
            default:
                throw new MemberRuntimeException(MemberExceptionCode.MEMBER_INPUT_TYPE_WRONG);
        }
    }

}
