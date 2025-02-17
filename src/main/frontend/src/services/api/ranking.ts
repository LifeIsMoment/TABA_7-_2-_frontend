import api from "../../api/axiosInstance";
import { RankingResponse } from "../../types/RankingResponse";
import { auth } from "@/lib/firebase/firebase";

// ✅ Firebase 사용자 토큰 가져오기
const getFirebaseToken = async (): Promise<string> => {
    const currentUser = auth.currentUser;
    if (!currentUser) throw new Error("🚫 Firebase 사용자 인증이 필요합니다.");

    // 최신 토큰 가져오기
    const idToken = await currentUser.getIdToken(true);
    return `Bearer ${idToken}`;
};

// ✅ 전체 랭킹 데이터 가져오기
export async function getRankingData(): Promise<RankingResponse | undefined> {
    try {
        const token = await getFirebaseToken();
        const response = await api.get<RankingResponse>('/rankings', {
            headers: {
                Authorization: token,
            },
        });
        console.log('📊 전체 랭킹 데이터:', response.data);
        return response.data;
    } catch (error) {
        console.error("❌ 전체 랭킹 데이터 로딩 실패:", error);
    }
}

// ✅ 특정 아파트의 랭킹 데이터 가져오기
export async function getAptRank(id: number): Promise<RankingResponse["selectedApartmentRankings"]> {
    try {
        const token = await getFirebaseToken();
        const response = await api.get<RankingResponse>(`/rankings?apartmentId=${id}`, {
            headers: {
                Authorization: token,
            },
        });
        console.log(`🏢 아파트 ${id} 랭킹 데이터:`, response.data);
        return response.data.selectedApartmentRankings ?? [];
    } catch (error) {
        console.error(`❌ 아파트 id=${id} 랭킹 데이터 로딩 실패:`, error);
        return [];
    }
}





// 아래는 토큰을 추가하기 전의 코드임
// import api from "../../api/axiosInstance";
// import { RankingResponse } from "../../types/RankingResponse";

// // 전체 랭킹 데이터 가져오기
// export async function getRankingData(): Promise<RankingResponse | undefined> {
//     try {
//         const response = await api.get<RankingResponse>('/rankings');
//         console.log('📊 전체 랭킹 데이터:', response.data);
//         return response.data;
//     } catch (error) {
//         console.error("전체 랭킹 데이터 로딩에 실패함", error);
//     }
// }

// // 특정 아파트의 랭킹 데이터 가져오기
// export async function getAptRank(id: number): Promise<RankingResponse["selectedApartmentRankings"]> {
//     try {
//         const response = await api.get<RankingResponse>(`/rankings?apartmentId=${id}`);
//         console.log(`🏢 아파트 ${id} 랭킹 데이터:`, response.data);
//         return response.data.selectedApartmentRankings ?? [];
//     } catch (error) {
//         console.error(`아파트 id = ${id} 데이터 로딩에 실패함`, error);
//         return [];
//     }
// }
