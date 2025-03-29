import {Member} from "types/index";
import Text from "components/Text/Text";

const BandMembers = ({members}: { members: Member[] }) => (
    <div>
        <Text className="text-bold" tag="h1"> Участники: </Text>
        <ul>
            {members.map((member, index) => (
                <li key={index}>
                    <Text> {member.first_name} {member.last_name} ({member.english}) — {member.instrument} </Text>
                </li>
            ))}
        </ul>
    </div>
);

export default BandMembers;
