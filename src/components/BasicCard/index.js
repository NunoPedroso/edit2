import "./basic-card.css";

import noImage from '../../data/article-writing.png'

function BasicCard(props) {
    const dateFormat = (date, format) => {
        if (Date.parse(date)) {
            const checkZero = (number) => {
                if (number < 9) {
                    number = `0${number}`;
                }
                return number;
            };
            date = Date.parse(date);
            date = new Date(date);
            const DD = checkZero(date.getDate());
            const MM = checkZero(date.getMonth() + 1);
            const YYYY = date.getFullYear();
            if (format === "DD-MM-YYYY") {
                return `${DD}-${MM}-${YYYY}`;
            } else {
                return `${YYYY}-${MM}-${DD}`;
            }
        }

        return date;
    };

    const date = dateFormat(props.date, "DD-MM-YYYY");
    //const date1 = new Date(props.date).toLocaleDateString('pt-PT')

    const image = props.imgPath || props.imgSocial || noImage;

    return (
        <div className="basic-card" id={props.id}>
            <img src={image} className="basic-card__img" alt={props.alt} />
            <div className="basic-card__body">
                {props.date && (
                    <span> <b>Published:</b> {date} </span>
                )}
                <h5>{props.title}</h5>
                <p className="basic-card__description">{props.description}</p>
                <a href={props.url}>{props.link}</a>
            </div>
        </div>
    );
}

export default BasicCard;
