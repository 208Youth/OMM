package com.omm.util;

public class CommonMethods {

    public static double distance(double lat1, double lng1, double lat2, double lng2) {
        // 지구의 반지름 (미터)
        final double R = 6371e3;

        // 위도와 경도를 라디안 단위로 변환
        double phi1 = Math.toRadians(lat1);
        double phi2 = Math.toRadians(lat2);
        double deltaPhi = Math.toRadians(lat2 - lat1);
        double deltaLambda = Math.toRadians(lng2 - lng1);

        // 두 점 사이의 거리 계산
        double a = Math.sin(deltaPhi / 2) * Math.sin(deltaPhi / 2)
                + Math.cos(phi1) * Math.cos(phi2) * Math.sin(deltaLambda / 2) * Math.sin(deltaLambda / 2);
        double c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

        return R * c / 1000.0;
    }

}
