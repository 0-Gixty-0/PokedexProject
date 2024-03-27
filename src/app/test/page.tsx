import styles from "./page.module.css";

function MyButton({ title }: { title: string }) {
    function showText() {
        alert("Text is shown now!")
    }
    return (
        <button onClick={showText}>{title}</button>
    )
}

function MyHeading({ heading }: {heading: string}) {
    return (
        <h2>{heading}</h2>
    )
}

export default function SimpleTest() {
    return (
        <div>
            <div className={styles.center}>
                <h1>Welcome to my simple test</h1>
                <MyButton title={"I'm a button!"}></MyButton>
            </div>
            <div className={styles.center}>
                <MyHeading heading={"This is my new heading!"}></MyHeading>
            </div>
        </div>
    );
}