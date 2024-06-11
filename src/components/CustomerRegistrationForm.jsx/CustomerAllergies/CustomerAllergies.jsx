import { useUserStore } from "../../../stores/userStore";
import PDTextArea from "../../PDTextArea/PDTextArea";

const CustomerAllergies = () => {
  const allergicSymptoms = useUserStore(
    (state) => state.Customer.allergicSymptoms
  );
  const allergicTriggers = useUserStore(
    (state) => state.Customer.allergicTriggers
  );
  const environmentalExposure = useUserStore(
    (state) => state.Customer.environmentalExposure
  );
  const setCustomerUserField = useUserStore(
    (state) => state.setCustomerUserField
  );

  return (
    <>
      <div className="flex-column">
        <PDTextArea
          label={"Symptoms"}
          placeholder={
            "Description of symptoms (e.g., sneezing, itching, rashes, swelling, difficulty breathing); Severity of symptoms (mild, moderate, severe); Duration of symptoms (how long they last, when they started);Frequency of symptoms (how often they occur) "
          }
          className={"align-self-start"}
          rows={6}
          cols={100}
          value={allergicSymptoms}
          onChangeFunc={(e) =>
            setCustomerUserField("allergicSymptoms", e.target.value)
          }
        />

        <PDTextArea
          label={"Triggers"}
          placeholder={
            "Suspected allergens (foods, pollen, dust, animal dander, insect stings, medications, etc.); Specific situations or environments where symptoms worsen (outdoors, indoors, during specific seasons);"
          }
          className={"align-self-center"}
          rows={6}
          cols={100}
          value={allergicTriggers}
          onChangeFunc={(e) =>
            setCustomerUserField("allergicTriggers", e.target.value)
          }
        />
        <PDTextArea
          label={"Lifestyle and Environment"}
          placeholder={
            "Suspected allergens (foods, pollen, dust, animal dander, insect stings, medications, etc.); Specific situations or environments where symptoms worsen (outdoors, indoors, during specific seasons);"
          }
          rows={6}
          cols={100}
          value={environmentalExposure}
          onChangeFunc={(e) =>
            setCustomerUserField("environmentalExposure", e.target.value)
          }
        />
      </div>
    </>
  );
};
export default CustomerAllergies;
