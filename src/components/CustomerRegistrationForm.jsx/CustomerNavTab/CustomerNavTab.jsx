import styles from "./CustomerNavTab.module.css";
const CustomerNavTab = ({ activeTab, setActiveTab }) => {
  return (
    <>
      <ul className={`nav nav-tabs m-3 w-75 ${styles.tabs}`} role="tablist">
        {["Contact", "Address and Occupation", "Medical History"].map(
          (item, _index) => (
            <li key={_index} class="nav-item link-dark" role="presentation">
              <button
                onClick={() => setActiveTab(_index)}
                className={
                  _index === Number(activeTab)
                    ? "nav-link active selected-tab"
                    : "nav-link "
                }
              >
                {item}
              </button>
            </li>
          )
        )}
      </ul>
    </>
  );
};
export default CustomerNavTab;