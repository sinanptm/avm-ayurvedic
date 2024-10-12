const nextPublicMeteredTurnUsername = process.env.NEXT_PUBLIC_METERED_TURN_USERNAME
const nextPublicMeteredTurnCredential = process.env.NEXT_PUBLIC_METERED_TURN_CREDENTIAL

const webRTCStuntServerConfig = {
    iceServers: [
        {
            urls: "stun:stun.relay.metered.ca:80",
        },
        {
            urls: "turn:global.relay.metered.ca:80",
            username: nextPublicMeteredTurnUsername,
            credential: nextPublicMeteredTurnCredential,
        },
        {
            urls: "turn:global.relay.metered.ca:80?transport=tcp",
            username: nextPublicMeteredTurnUsername,
            credential: nextPublicMeteredTurnCredential,
        },
        {
            urls: "turn:global.relay.metered.ca:443",
            username: nextPublicMeteredTurnUsername,
            credential: nextPublicMeteredTurnCredential,
        },
        {
            urls: "turns:global.relay.metered.ca:443?transport=tcp",
            username: nextPublicMeteredTurnUsername,
            credential: nextPublicMeteredTurnCredential,
        },
    ],
}

export default webRTCStuntServerConfig