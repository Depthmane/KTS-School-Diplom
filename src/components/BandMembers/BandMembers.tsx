import {Member} from "types/band";
import Text from "components/Text";
import * as React from "react";
import {observer} from "mobx-react-lite";

const BandMembers = observer(({members}: { members: Member[] }) => (
    <div>
        <Text className="text-bold" tag="h2"> Участники: </Text>
        <ul>
            {members.map((member, index) => (
                <li key={index}>
                    <Text> <strong>{member.firstName} {member.lastName} </strong> ({member.english}) — {member.instrument} </Text>
                </li>
            ))}
        </ul>
    </div>
));

export default React.memo(BandMembers);
