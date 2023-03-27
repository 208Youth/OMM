package com.omm.util;

import com.omm.exception.member.MemberExceptionCode;
import com.omm.exception.member.MemberRuntimeException;
import com.omm.model.entity.enums.*;

public class EnumToKNN {

    public static float filterContactToKNN(FilterContactStyle filterContactStyle) {
        switch (filterContactStyle) {
            case NONE:
            case PREFER_FACECALL:
                return 5.0F;
            case PREFER_MSG:
                return 3.0F;
            case PREFER_CALL:
                return 7.0F;
            case NOT_MSG:
                return 1.0F;
            case PREFER_OFFLINE:
                return 9.0F;
            default:
                throw new MemberRuntimeException(MemberExceptionCode.MEMBER_INPUT_TYPE_WRONG);
        }
    }

    public static float filterDrinkingToKNN(FilterDrinkingStyle filterDrinkingStyle) {
        switch (filterDrinkingStyle) {
            case NONE:
                return 5.0F;
            case PREFER_NO:
                return 0.0F;
            case PREFER_YES:
                return 10.0F;
            default:
                throw new MemberRuntimeException(MemberExceptionCode.MEMBER_INPUT_TYPE_WRONG);
        }
    }


    public static float filterSmokingToKNN(FilterSmokingStyle filterSmokingStyle) {
        switch (filterSmokingStyle) {
            case NONE:
                return 5.0F;
            case PREFER_NO:
                return 0.0F;
            case PREFER_YES:
                return 10.0F;
            default:
                throw new MemberRuntimeException(MemberExceptionCode.MEMBER_INPUT_TYPE_WRONG);
        }
    }

    public static float infoContactToKNN(InfoContactStyle infoContactStyle) {
        switch (infoContactStyle) {
            case PREFER_MSG:
                return 3.0F;
            case PREFER_CALL:
                return 7.0F;
            case PREFER_FACECALL:
                return 5.0F;
            case NOT_MSG:
                return 1.0F;
            case PREFER_OFFLINE:
                return 9.0F;
            default:
                throw new MemberRuntimeException(MemberExceptionCode.MEMBER_INPUT_TYPE_WRONG);
        }
    }

    public static float infoDrinkingToKNN(InfoDrinkingStyle infoDrinkingStyle) {
        switch (infoDrinkingStyle) {
            case NOT:
                return 0.0F;
            case SOMETIMES:
                return 4.0F;
            case OFTEN:
                return 6.0F;
            case EVERYDAY:
                return 10.0F;
            case ONLY_FRIENDS: case STOPPING:
                return 2.0F;
            default:
                throw new MemberRuntimeException(MemberExceptionCode.MEMBER_INPUT_TYPE_WRONG);
        }
    }

    public static float infoSmokingToKNN(InfoSmokingStyle infoSmokingStyle) {
        switch (infoSmokingStyle) {
            case NOT:
                return 0.0F;
            case SOMETIMES:
                return 5.0F;
            case OFTEN:
                return 10.0F;
            case STOPPING:
                return 2.0F;
            default:
                throw new MemberRuntimeException(MemberExceptionCode.MEMBER_INPUT_TYPE_WRONG);
        }
    }

}
