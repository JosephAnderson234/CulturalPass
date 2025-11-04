import { getProfile } from "@src/services/user/me";
import { ProfileForm } from './UserProfileForm';
import LatestEvents from "./LatestEvents";

export async function ProfileLayer() {
    const data = await getProfile();

    return (
            <div className="mx-auto p-5 flex flex-row bg-background w-11/12 rounded-3xl shadow-lg gap-10">
                <div className="w-1/2">
                    <ProfileForm data={data} />
                </div>
                
                <div className="w-1/2">
                    <LatestEvents />
                </div>
            </div>

    )
}