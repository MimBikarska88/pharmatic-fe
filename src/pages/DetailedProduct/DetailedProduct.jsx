import PDInput from "../../components/PDInput/PDInput";
import PDTextArea from "../../components/PDTextArea/PDTextArea";
import PDSelect from "../../components/PDSelect/PDSelect";
import PDButton from "../../components/PDButton/PDButton";
import styles from "./DetailedProduct.module.css";
import PDFileInput from "../../components/PDFileInput/PDFileInput";

import useGetClassificationQuery from "../../queries/GetClassificationQuery/useGetClassificationQuery";
import useGetVendorLicensesQuery from "../../queries/GetVendorLicensesQuery/useGetVendorLicensesQuery";
import {
  productPlaceholders,
  validateProductFields,
} from "./DetailedProductUtils";
import { useEffect, useState } from "react";
import { useErrorStore } from "../../stores/errorStore";
import { useValidationStore } from "../../stores/validationStore";
import { isEmptyString } from "../../utils/basicValidation.util";
import { Mode } from "../../utils/mode";
import useCreatePharmProductMutation from "../../queries/CreatePharmProductMutation/useCreatePharmProductMutation";
import useUpdatePharmProductMutation from "../../queries/UpdatePharmProductMutation/useUpdatePharmProductMutation";
import useGetProductByIdQuery from "../../queries/GetProductByIdQuery/useGetProductByIdQuery";
import { useUserStore } from "../../stores/userStore";
import {
  ResidenceType,
  getLicenseStaticInformation,
} from "../../utils/residenceTypes";
import { useNavigate, useParams } from "react-router";
import { roleType } from "../../utils/roleTypes";

const DetailedProduct = (props) => {
  const { mode } = props;
  const { ProductErrors, setProductError } = useErrorStore();
  const { Product, setProductFieldValidity } = useValidationStore();
  const navigate = useNavigate();
  const { productId } = useParams();
  const { Vendor, role } = useUserStore();

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
    photo: null,
    imageSrc: null,
  });
  const {
    data: vendorLicenses = [],
    error: vendorLicensesError,
    isLoading: vendorLicensesLoading,
  } = useGetVendorLicensesQuery({
    enabled: role === roleType.vendor,
  });
  const {
    data: classifications,
    error: classificationError,
    isLoading: classificationLoading,
  } = useGetClassificationQuery();
  const {
    data: productData = null,
    error: productDataError,
    isLoading: isProductDataLoading,
    refetch: refetchProduct,
  } = useGetProductByIdQuery(productId, {
    enabled: !!productId && mode !== Mode.Create,
  });
  const onSuccess = (res) => {
    navigate("/stock");
  };

  const onUpdateSuccess = (res) => {
    navigate(`/stock/view/${product._id}`);
    refetchProduct();
  };
  const onError = (err) => {
    const { Errors } = err.response.data;
    if (Errors) {
      Object.entries(Errors).forEach((entry) => {
        if (!isEmptyString(entry[1])) {
          setProductError(entry[0], entry[1]);
          setProductFieldValidity(entry[0], false);
        }
      });
    }
  };
  const createPharmProductMutation = useCreatePharmProductMutation(
    onError,
    onSuccess
  );
  const updatePharmProductMutation = useUpdatePharmProductMutation(
    onError,
    onUpdateSuccess
  );
  useEffect(() => {
    // temp fix for side effects state

    if (productData && !productDataError) {
      setProduct({
        ...productData.data,
        sideEffects: productData.data.sideEffect,
        classification: {
          value: productData.data.classification._id,
          label: productData.data.classification.name,
        },
        licenseType: productData.data?.licenseType
          ? getLicenseStaticInformation(productData.data.licenseType)
          : null,
        imageSrc: productData.data?.photo,
      });
    }
  }, [productData, productDataError]);

  // Handle loading and error states
  if (vendorLicensesLoading || classificationLoading || isProductDataLoading) {
    return <div>Loading...</div>;
  }

  if (vendorLicensesError || classificationError || productDataError) {
    return (
      <div>
        Error:
        {vendorLicensesError?.message ||
          classificationError?.message ||
          productDataError?.message}
      </div>
    );
  }

  const handleFileChange = (event, fieldName) => {
    const file = event.target?.files[0];
    if (!file || !["pil", "photo"].includes(fieldName)) {
      return;
    }
    setProduct((state) => ({ ...state, [`${fieldName}`]: file }));
    setProductFieldValidity(fieldName, true);
    setProductError(fieldName, "");
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
      {mode === Mode.Create && (
        <h4 className="text-center mt-2">Create Product</h4>
      )}
      {mode === Mode.Edit && <h4 className="text-center mt-2">Edit Product</h4>}
      {mode === Mode.View && (
        <h4 className="text-center mt-2">Product Details</h4>
      )}

      {mode !== Mode.Create && (
        <div className="d-flex flex-row justify-content-center">
          <img
            style={{ width: "400px", height: "400px" }}
            src={`http://localhost:8080/uploads/vendor/drugs/images/${product.imageSrc}`}
            alt="img"
            className="img-thumbnail"
          />
        </div>
      )}
      <div className="d-flex flex-row">
        <div className="flex-column p-3">
          <PDInput
            disabled={mode === Mode.View}
            required={mode !== Mode.View}
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
            disabled={mode === Mode.View}
            required={mode !== Mode.View}
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
            disabled={mode === Mode.View}
            required={mode !== Mode.View}
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
            disabled={mode === Mode.View}
            required={mode !== Mode.View}
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
            disabled={mode === Mode.View}
            required={mode !== Mode.View}
            className={styles["input-field"]}
            options={classifications}
            isValid={Product.classification}
            label="Classification"
            selectedOption={product.classification || ""}
            onChange={(e) => {
              console.log(e.value);
              setProduct((state) => ({
                ...state,
                classification: e.value,
              }));
            }}
          />
          <PDSelect
            disabled={mode === Mode.View}
            required={mode !== Mode.View}
            isValid={Product.licenseType}
            errorMessage={Product.licenseType}
            className={styles["input-field"]}
            options={vendorLicenses}
            label="Required License Type"
            selectedOption={product.licenseType || ""}
            onChange={(e) => {
              setProduct((state) => ({
                ...state,
                licenseType: e.value,
              }));
            }}
          />
        </div>
        <div className="flex-column p-3">
          <PDInput
            disabled={mode === Mode.View}
            required={mode !== Mode.View}
            isValid={Product.price}
            errorMessage={ProductErrors.price}
            type="number"
            className={styles["input-field"]}
            label="Price"
            step="0.01"
            placeholder={
              Vendor.residence === ResidenceType.EU
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
            disabled={mode === Mode.View}
            required={mode !== Mode.View}
            isValid={Product.routeOfAdministration}
            errorMessage={ProductErrors.routeOfAdministration}
            className={styles["input-field"]}
            label="Route of Administration"
            placeholder={productPlaceholders.routeOfAdministration}
            value={product.routeOfAdministration || ""}
            onChangeFunc={(e) => {
              productInputFieldChangeHandler(
                "routeOfAdministration",
                e.target.value
              );
            }}
          />
          {mode !== Mode.View && (
            <PDFileInput
              ref={null}
              isValid={Product.pil}
              errorMessage={ProductErrors.pil}
              required={true}
              label={`Patient Information Leaflet (PIL).`}
              styles={{ height: "100px" }}
              onChangeFunc={(e) => handleFileChange(e, "pil")}
            />
          )}
        </div>
      </div>
      {mode !== Mode.View ? (
        <div className="d-flex flex-row">
          <PDFileInput
            ref={null}
            isValid={Product.photo}
            errorMessage={ProductErrors.photo}
            required={true}
            label={`Product Image`}
            styles={{ width: "100%" }}
            onChangeFunc={(e) => handleFileChange(e, "photo")}
          />
        </div>
      ) : (
        <a
          rel="noreferrer"
          className={`${styles["link"]}`}
          target={"_blank"}
          href={`http://localhost:8080/uploads/vendor/drugs/pils/${product.pil}`}
        >
          Patient Information Leaflet (PIL).
        </a>
      )}

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
        {mode === Mode.Create && role === roleType.vendor && (
          <PDButton
            color="purple"
            value="Add Pharmaceutical"
            onClick={() => {
              createPharmProductMutation.mutate({
                ...product,
                residence: Vendor.residence,
              });
            }}
          />
        )}
        {mode === Mode.Edit && role === roleType.vendor && (
          <PDButton
            color="green"
            value="Edit Pharmaceutical"
            onClick={() => {
              updatePharmProductMutation.mutate({
                ...product,
                residence: Vendor.residence,
              });
            }}
          />
        )}
        {mode === Mode.View && role === roleType.vendor && (
          <PDButton
            color="green"
            value="Click to Edit Pharmaceutical"
            onClick={() => navigate(`/stock/edit/${product._id}`)}
          />
        )}
        {mode === Mode.View && role === roleType.customer && (
          <PDButton
            color="purple"
            value="Add to cart"
            onClick={() => {
              console.log("add to cart");
            }}
          />
        )}
      </div>
    </>
  );
};
export default DetailedProduct;
