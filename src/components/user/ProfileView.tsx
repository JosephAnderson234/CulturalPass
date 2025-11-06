import { getProfile } from "@src/services/user/me";
import { ProfileForm } from './UserProfileForm';
import LatestEvents from "./LatestEvents";

export async function ProfileLayer() {
    const data = await getProfile();

    return (
            <div className="mx-auto mt-7 p-5 grid grid-cols-2  bg-background w-11/12 rounded-3xl shadow-lg gap-10 items-stretch">
                <div className="">
                    <ProfileForm data={data} />
                </div>
                
                <div className="">
                    <LatestEvents />
                </div>
            </div>

    )
}