import PDInput from "../../components/PDInput/PDInput";
import PDTextArea from "../../components/PDTextArea/PDTextArea";
import PDSelect from "../../components/PDSelect/PDSelect";
import PDButton from "../../components/PDButton/PDButton";
import styles from "./CreateProduct.module.css";
import PDFileInput from "../../components/PDFileInput/PDFileInput";

import useGetClassificationQuery from "../../queries/GetClassificationQuery/useGetClassificationQuery";
import useGetVendorLicensesQuery from "../../queries/GetVendorLicensesQuery/useGetVendorLicensesQuery";
import {
  productPlaceholders,
  validateProductFields,
} from "./CreateProductUtils";
import { useState } from "react";
import { useErrorStore } from "../../stores/errorStore";
import { useValidationStore } from "../../stores/validationStore";
import useCreatePharmProductMutation from "../../queries/CreatePharmProductMutation/useCreatePharmProductMutation";

const CreateProduct = (props) => {
  const ProductErrors = useErrorStore((state) => state.ProductErrors);
  const Product = useValidationStore((state) => state.Product);

  const onSuccess = (res) => {
    console.log(res.data);
  };
  const onError = (err) => {
    console.log(err);
  };
  const createPharmProductMutation = useCreatePharmProductMutation(
    onError,
    onSuccess
  );
  const [product, setProduct] = useState({
    isoCertificate: "",
    chemicalFormula: "",
    appearance: "",
    routeOfAdministration: "",
    indications: "",
    sideEffects: "",
    currencyNonEu: "",
    currencyEu: "",
    price: "",
    pil: null,
    classification: null,
    licenseType: null,
  });
  const {
    data: vendorLicenses,
    error: vendorLicensesError,
    isLoading: vendorLicensesLoading,
  } = useGetVendorLicensesQuery();
  console.log(vendorLicenses);
  const {
    data: classifications,
    error: classificationError,
    isLoading: classificationLoading,
  } = useGetClassificationQuery();

  // Handle loading and error states
  if (vendorLicensesLoading || classificationLoading) {
    return <div>Loading...</div>;
  }

  if (vendorLicensesError || classificationError) {
    return (
      <div>
        Error: {vendorLicensesError?.message || classificationError?.message}
      </div>
    );
  }

  const handleFileChange = (event) => {
    if (event.target.files.length === 0) {
      return;
    }
    const file = event.target?.files[0];
    if (file) {
      console.log(file);
      setProduct((state) => ({ ...state, pil: file }));
    }
  };

  const productInputFieldChangeHandler = (fieldName, fieldValue) => {
    setProduct((state) => ({
      ...state,
      [`${fieldName}`]: fieldValue,
    }));
    validateProductFields(fieldName, fieldValue);
  };
  return (
    <>
      <div className="d-flex flex-row">
        <div className="flex-column p-3">
          <PDInput
            required
            isValid={Product.medicationName}
            errorMessage={ProductErrors.medicationName}
            className={styles["input-field"]}
            label="Medication name"
            value={product.medicationName}
            onChangeFunc={(e) => {
              productInputFieldChangeHandler("medicationName", e.target.value);
            }}
          />
          <PDInput
            required
            isValid={Product.isoCertificate}
            errorMessage={ProductErrors.isoCertificate}
            className={styles["input-field"]}
            label="ISO Certifications"
            placeholder={productPlaceholders.isoCertificate}
            value={product.isoCertificate}
            onChangeFunc={(e) => {
              productInputFieldChangeHandler("isoCertificate", e.target.value);
            }}
          />
          <PDInput
            required
            isValid={Product.chemicalFormula}
            errorMessage={ProductErrors.chemicalFormula}
            className={styles["input-field"]}
            placeholder={productPlaceholders.chemicalFormula}
            label="Chemical Formula"
            value={product.chemicalFormula}
            onChangeFunc={(e) => {
              productInputFieldChangeHandler("chemicalFormula", e.target.value);
            }}
          />
        </div>
        <div className="flex-column p-3">
          <PDInput
            required
            isValid={Product.appearance}
            errorMessage={ProductErrors.appearance}
            className={styles["input-field"]}
            label="Appearance"
            placeholder={productPlaceholders.appearance}
            value={product.appearance}
            onChangeFunc={(e) => {
              productInputFieldChangeHandler("appearance", e.target.value);
            }}
          />
          <PDSelect
            required
            className={styles["input-field"]}
            options={classifications}
            label="Classification"
            value={product.classification || ""}
            onChangeFunc={(e) => {
              setProduct((state) => ({
                ...state,
                classification: e.value,
              }));
            }}
          />
          <PDSelect
            required
            isValid={Product.licenseType}
            errorMessage={Product.licenseType}
            className={styles["input-field"]}
            options={vendorLicenses}
            label="Required License Type"
            value={product.licenseType}
            onChangeFunc={(e) => {
              setProduct((state) => ({
                ...state,
                licenseType: e.value,
              }));
            }}
          />
        </div>
        <div className="flex-column p-3">
          <PDInput
            required
            isValid={Product.price}
            errorMessage={ProductErrors.price}
            type="number"
            className={styles["input-field"]}
            label="Price"
            step="0.01"
            placeholder={
              1
                ? productPlaceholders.currencyEu
                : productPlaceholders.currencyNonEu
            }
            value={product.price}
            onChangeFunc={(e) => {
              productInputFieldChangeHandler("price", e.target.value);
            }}
          />
          <PDInput
            type="text"
            required
            isValid={Product.routeOfAdministration}
            errorMessage={ProductErrors.routeOfAdministration}
            className={styles["input-field"]}
            label="Route of Administration"
            placeholder={productPlaceholders.roa}
            value={product.routeOfAdministration || ""}
            onChangeFunc={(e) => {
              productInputFieldChangeHandler(
                "routeOfAdministration",
                e.target.value
              );
            }}
          />
          <PDFileInput
            ref={null}
            isValid={Product.pil}
            errorMessage={ProductErrors.pil}
            required={true}
            label={`Patient Information Leaflet (PIL).`}
            styles={{ height: "100px" }}
            onChangeFunc={handleFileChange}
          />
        </div>
      </div>
      <div className="d-flex flex-row">
        <PDTextArea
          cols={150}
          required
          isValid={Product.indications}
          errorMessage={ProductErrors.indications}
          rows={6}
          className="mb-2 p-1"
          label="Indications"
          value={product.indications}
          onChangeFunc={(e) => {
            productInputFieldChangeHandler("indications", e.target.value);
          }}
          placeholder={productPlaceholders.indications}
        />
      </div>
      <div className="d-flex flex-row">
        <PDTextArea
          cols={150}
          required
          rows={6}
          isValid={Product.sideEffects}
          errorMessage={ProductErrors.sideEffect}
          className="mb-2 p-1"
          label="Side Effects"
          value={product.sideEffects}
          onChangeFunc={(e) => {
            productInputFieldChangeHandler("sideEffects", e.target.value);
          }}
          placeholder={productPlaceholders.sideEffect}
        />
      </div>
      <div className="d-flex flex-row-reverse m-4 p-4">
        <PDButton
          color="purple"
          value="Add Pharmaceutical"
          onClick={() => {
            createPharmProductMutation.mutate(product);
          }}
        />
      </div>
    </>
  );
};
export default CreateProduct;
