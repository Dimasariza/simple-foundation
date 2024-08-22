import { motion } from "framer-motion";
import { Card, CardProps } from "primereact/card";

const MotionCard = motion<any>(Card);

function AppCard(props: CardProps) {
    const cardProps = {
        ...props,
        className: `${props?.className ?? ""} !fixed bottom-20 right-10`,
        style: {
            width: "734px",
            height: "737px",
            border: "1px solid #red",
            borderRadius: "5px",
            background: "white",
            ...props.style
        },
        unstyled: true
    }

    const defaultState = {
        opacity: 0,
        scale: 0.6
    };

    return (
        <MotionCard
            {...cardProps}
            initial={defaultState}
            exit={defaultState}
            animate={{
              opacity: 1,
              scale: 1
            }}
        >
            {props.children}
        </MotionCard>
    )
}

export default AppCard;