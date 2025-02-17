// src/types/RankingResponse.ts
export interface RankingUser {
    nickname: string;
    monthlyPoints: number;
    grade: string;
    month: number;
    apartmentId: number;
    ranking: number;
    pointsToNextGrade: number;
    accumulatedPoints: number;
    uid: string;
    userUid: string | null; // user(사용자)의 uid는 userUid로 특별함
}

export interface MonthlyPoints {
    month: number;
    totalPoints: number;
}

export interface RankingResponse {
    aboveUser: RankingUser | null;
    top3Users: RankingUser[];
    belowUser: RankingUser | null;
    allRankings: RankingUser[];
    selectedApartmentRankings: RankingUser[] | null;
    monthlyPoints: MonthlyPoints[];
    user: RankingUser;
    userApartmentRankings: RankingUser[];
}
