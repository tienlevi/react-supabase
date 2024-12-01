import ResultStatus from "../components/ResultStatus";

function ConfirmEmail() {
  const params = new URLSearchParams(window.location.href);
  const errorStatus = params.get("error_code");
  const errorDescription = params.get("error_description");

  return errorStatus !== null ? (
    <ResultStatus
      status="error"
      title={errorStatus}
      subTitle={errorDescription!}
      href="/login"
      buttonText="Go to login page"
    />
  ) : (
    <ResultStatus
      status="success"
      title="Confirm Email Success"
      href="/"
      buttonText="Go to home page"
    />
  );
}

export default ConfirmEmail;
