import { getProfile } from "@src/services/user/me";
import { ProfileForm } from './UserProfileForm';

export async function ProfileLayer() {
    const data = await getProfile();

    return (
            <div className="mx-auto p-5 flex flex-row bg-background w-11/12 rounded-3xl shadow-lg gap-10">
                <ProfileForm data={data} />
                <div className="w-1/2">
                    
                </div>
            </div>

    )
}