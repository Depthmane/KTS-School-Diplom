import * as React from "react";
import Text from "components/Text";

const BandMembersSkeleton = () => (
    <div>
        <Text className="text-bold" tag="h2"> Участники: </Text>
        <ul>
            {[...Array(4)].map((_, index) => (
                <li key={index}>
                    <div style={{
                        height: 20,
                        width: '60%',
                        background: 'var(--skeleton-bg)',
                        borderRadius: 4,
                        margin: '8px 0'
                    }} />
                </li>
            ))}
        </ul>
    </div>
);

export default BandMembersSkeleton;
