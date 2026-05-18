import { createFileRoute, useRouter } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useState } from "react";
import { Check, CreditCard, Lock, Truck } from "lucide-react";
import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import { products } from "@/lib/data";
import { formatCurrency } from "@/lib/utils";

export const Route = createFileRoute("/checkout")({
  component: Checkout,
  head: () => ({ meta: [{ title: "Checkout - #Label" }] }),
});

function Checkout() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [shipping, setShipping] = useState({
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    postalCode: "",
    country: "",
    phone: "",
  });
  const [payment, setPayment] = useState({
    cardNumber: "",
    cardholderName: "",
    expiryCvv: "",
  });
  const items = products.slice(0, 3);
  const total = items.reduce((s, p) => s + p.price, 0);
  const steps = ["Shipping", "Payment", "Review"];

  const isShippingValid = Object.values(shipping).every((value) => value.trim().length > 0);
  const isPaymentValid = Object.values(payment).every((value) => value.trim().length > 0);
  const canContinue = step === 1 ? isShippingValid : step === 2 ? isPaymentValid : true;

  return (
    <Box
      component={motion.div}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      sx={{
        position: "relative",
        overflow: "hidden",
        mx: "auto",
        px: { xs: 3, md: 4 },
        py: { xs: 10, md: 16 },
        maxWidth: { xs: "100%", xl: 1180 },
        width: "100%",
        backgroundColor: "var(--background)",
        backgroundImage: "var(--gradient-hero)",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center top",
        "&::before": {
          content: '""',
          position: "absolute",
          top: -80,
          right: -80,
          width: 360,
          height: 360,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(210,182,143,0.16), transparent 56%)",
          filter: "blur(96px)",
          zIndex: 0,
        },
        "&::after": {
          content: '""',
          position: "absolute",
          bottom: -120,
          left: -80,
          width: 320,
          height: 320,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(255,255,255,0.06), transparent 58%)",
          filter: "blur(84px)",
          zIndex: 0,
        },
      }}
    >
      <Box sx={{ position: "relative", zIndex: 1, maxWidth: 1180, mx: "auto" }}>
        <Typography
          component="h1"
          variant="h3"
          className="display-lg"
          sx={{
            color: "#f7efe7",
            letterSpacing: "0.08em",
            lineHeight: 1,
            textShadow: "0 20px 50px rgba(0,0,0,0.25)",
          }}
        >
          Checkout
        </Typography>

        <Box
          sx={{
            mt: 8,
            mb: 12,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 3,
            flexWrap: "wrap",
          }}
        >
          {steps.map((label, index) => {
            const isActive = step === index + 1;
            const isComplete = step > index + 1;
            return (
              <Box
                key={label}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                  minWidth: 130,
                  position: "relative",
                }}
              >
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, delay: index * 0.08 }}
                  style={{
                    width: 52,
                    height: 52,
                    borderRadius: "50%",
                    display: "grid",
                    placeItems: "center",
                    color: isActive || isComplete ? "#09090a" : "#f5efe8",
                    fontWeight: 700,
                    background: isActive
                      ? "linear-gradient(135deg, rgba(255,244,227,0.98), rgba(235,209,157,0.94))"
                      : isComplete
                        ? "rgba(210,182,143,0.16)"
                        : "rgba(255,255,255,0.05)",
                    border:
                      isActive || isComplete
                        ? "1px solid rgba(210,182,143,0.36)"
                        : "1px solid rgba(255,255,255,0.1)",
                    boxShadow: isActive
                      ? "0 24px 72px rgba(210,182,143,0.24)"
                      : "0 16px 40px rgba(0,0,0,0.22)",
                    backdropFilter: "blur(18px)",
                  }}
                >
                  {isComplete ? <Check className="w-4 h-4" /> : index + 1}
                </motion.div>

                <Box sx={{ display: "grid", gap: 0.5 }}>
                  <Typography
                    sx={{
                      color: isActive || isComplete ? "#f7efe7" : "rgba(245,239,232,0.65)",
                      fontSize: "0.72rem",
                      letterSpacing: "0.24em",
                      textTransform: "uppercase",
                    }}
                  >
                    {label}
                  </Typography>
                  <Box
                    sx={{
                      width: 40,
                      height: 3,
                      borderRadius: 99,
                      background:
                        isActive || isComplete
                          ? "linear-gradient(90deg, rgba(255,244,227,0.95), rgba(210,182,143,0.72))"
                          : "rgba(255,255,255,0.08)",
                      transform: isActive ? "scaleX(1.15)" : "scaleX(1)",
                      transition: "all 0.35s ease",
                    }}
                  />
                </Box>
                {index < steps.length - 1 && (
                  <Box
                    component={motion.div}
                    initial={{ opacity: 0, scaleX: 0 }}
                    animate={{ opacity: 1, scaleX: 1 }}
                    transition={{ duration: 0.6, delay: index * 0.08 + 0.1 }}
                    sx={{
                      flex: 1,
                      height: 2,
                      borderRadius: 1,
                      background: isComplete
                        ? "linear-gradient(90deg, rgba(255,244,227,0.9), rgba(210,182,143,0.24))"
                        : "rgba(255,255,255,0.08)",
                      transformOrigin: "left",
                    }}
                  />
                )}
              </Box>
            );
          })}
        </Box>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", lg: "1.95fr 1fr" },
            gap: { xs: 6, md: 8 },
            alignItems: "start",
            position: "relative",
            zIndex: 1,
          }}
        >
          <motion.div
            key={step}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          >
            <Paper
              elevation={0}
              sx={{
                position: "relative",
                p: { xs: 5, md: 9 },
                borderRadius: 5,
                background: "linear-gradient(180deg, rgba(8,8,10,0.96), rgba(14,14,18,0.98))",
                border: "1px solid rgba(255,255,255,0.08)",
                boxShadow: "0 48px 140px rgba(0, 0, 0, 0.42), inset 0 0 2px rgba(255,255,255,0.02)",
                backdropFilter: "blur(36px)",
                overflow: "hidden",
                "&::before": {
                  content: '""',
                  position: "absolute",
                  inset: 0,
                  background: "linear-gradient(180deg, rgba(255,255,255,0.08), transparent 35%)",
                  opacity: 0.68,
                  pointerEvents: "none",
                },
              }}
            >
              <Box sx={{ mb: 4 }}>
                <Typography
                  component="h2"
                  sx={{
                    fontSize: { xs: "1.75rem", md: "2rem" },
                    fontWeight: 700,
                    letterSpacing: "0.02em",
                    mb: 1,
                  }}
                >
                  {step === 1
                    ? "Shipping address"
                    : step === 2
                      ? "Payment details"
                      : "Order review"}
                </Typography>
                <Typography
                  sx={{ color: "rgba(245,239,232,0.6)", fontSize: "0.95rem", maxWidth: 560 }}
                >
                  {step === 1
                    ? "Enter your delivery information with premium precision."
                    : step === 2
                      ? "Secure card details with cinematic color, glow, and refined spacing."
                      : "Confirm your couture order before you place it."}
                </Typography>
              </Box>

              {step === 1 && (
                <Box className="grid md:grid-cols-2 gap-4">
                  {[
                    { label: "First name", name: "firstName" },
                    { label: "Last name", name: "lastName" },
                  ].map((field) => (
                    <Field
                      key={field.name}
                      label={field.label}
                      value={shipping[field.name as keyof typeof shipping]}
                      onChange={(value) =>
                        setShipping((prev) => ({ ...prev, [field.name]: value }))
                      }
                    />
                  ))}
                  <Box sx={{ gridColumn: { md: "1 / -1" } }}>
                    <Field
                      label="Address"
                      value={shipping.address}
                      onChange={(value) => setShipping((prev) => ({ ...prev, address: value }))}
                    />
                  </Box>
                  <Field
                    label="City"
                    value={shipping.city}
                    onChange={(value) => setShipping((prev) => ({ ...prev, city: value }))}
                  />
                  <Field
                    label="Postal code"
                    value={shipping.postalCode}
                    onChange={(value) => setShipping((prev) => ({ ...prev, postalCode: value }))}
                  />
                  <Field
                    label="Country"
                    value={shipping.country}
                    onChange={(value) => setShipping((prev) => ({ ...prev, country: value }))}
                  />
                  <Field
                    label="Phone"
                    value={shipping.phone}
                    onChange={(value) => setShipping((prev) => ({ ...prev, phone: value }))}
                  />
                </Box>
              )}

              {step === 2 && (
                <Box className="grid md:grid-cols-2 gap-4">
                  <Box sx={{ gridColumn: { md: "1 / -1" } }}>
                    <Field
                      label="Card number"
                      value={payment.cardNumber}
                      onChange={(value) => setPayment((prev) => ({ ...prev, cardNumber: value }))}
                    />
                  </Box>
                  <Field
                    label="Cardholder name"
                    value={payment.cardholderName}
                    onChange={(value) => setPayment((prev) => ({ ...prev, cardholderName: value }))}
                  />
                  <Field
                    label="Expiry · CVV"
                    value={payment.expiryCvv}
                    onChange={(value) => setPayment((prev) => ({ ...prev, expiryCvv: value }))}
                  />
                  <Paper
                    elevation={0}
                    sx={{
                      border: "1px solid rgba(255,255,255,0.08)",
                      backgroundColor: "rgba(255,255,255,0.03)",
                      p: 3,
                      display: "flex",
                      alignItems: "center",
                      gap: 1.5,
                      borderRadius: 3,
                      mt: 1,
                    }}
                  >
                    <Lock className="w-4 h-4 text-accent" />
                    <Typography variant="body2" color="text.secondary">
                      Encrypted payment · processed by Stripe
                    </Typography>
                  </Paper>
                </Box>
              )}

              {step === 3 && (
                <Box className="space-y-4">
                  {items.map((item, index) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 14 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.08 }}
                      style={{
                        display: "flex",
                        gap: "1rem",
                        alignItems: "center",
                        borderBottom: "1px solid rgba(255,255,255,0.08)",
                        paddingBottom: "1rem",
                      }}
                    >
                      <Box
                        component="img"
                        src={item.image}
                        alt={item.name}
                        sx={{ width: 84, height: 108, objectFit: "cover", borderRadius: 2 }}
                      />
                      <Box sx={{ flex: 1 }}>
                        <Typography sx={{ fontWeight: 600, letterSpacing: "0.01em" }}>
                          {item.name}
                        </Typography>
                        <Typography
                          variant="caption"
                          color="text.secondary"
                          sx={{
                            textTransform: "uppercase",
                            letterSpacing: "0.2em",
                            mt: 0.75,
                            display: "block",
                          }}
                        >
                          {item.designer}
                        </Typography>
                      </Box>
                      <Typography sx={{ fontVariantNumeric: "tabular-nums", fontWeight: 500 }}>
                        {formatCurrency(item.price)}
                      </Typography>
                    </motion.div>
                  ))}
                </Box>
              )}

              <Box
                sx={{
                  mt: 8,
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 3,
                  justifyContent: "space-between",
                }}
              >
                <Button
                  type="button"
                  variant="outlined"
                  onClick={() => {
                    if (step === 1) {
                      router.navigate({ to: "/cart" });
                    } else {
                      setStep((current) => Math.max(1, current - 1));
                    }
                  }}
                  sx={{
                    minWidth: 140,
                    borderRadius: 99,
                    border: "1px solid rgba(210,182,143,0.35)",
                    color: "#f5efe8",
                    py: 1.8,
                    px: 5,
                    letterSpacing: "0.24em",
                    fontSize: "0.78rem",
                    background: "rgba(8, 8, 10, 0.82)",
                    boxShadow: "inset 0 0 0 rgba(255,255,255,0)",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      borderColor: "rgba(210,182,143,0.55)",
                      background: "rgba(255,255,255,0.1)",
                      transform: "translateY(-1px)",
                    },
                  }}
                >
                  Back
                </Button>
                <Button
                  type="button"
                  variant="contained"
                  onClick={() => setStep((current) => Math.min(3, current + 1))}
                  disabled={!canContinue}
                  sx={{
                    minWidth: 180,
                    borderRadius: 99,
                    py: 1.8,
                    px: 5,
                    letterSpacing: "0.24em",
                    fontSize: "0.78rem",
                    textTransform: "uppercase",
                    color: "#09090a",
                    background:
                      "linear-gradient(135deg, rgba(210,182,143,1), rgba(255,244,227,0.96))",
                    boxShadow: "0 24px 60px rgba(210,182,143,0.22)",
                    "&:hover": {
                      background:
                        "linear-gradient(135deg, rgba(255,244,227,1), rgba(210,182,143,1))",
                      transform: "translateY(-1px)",
                      boxShadow: "0 26px 68px rgba(210,182,143,0.28)",
                    },
                    "&.Mui-disabled": {
                      opacity: 0.4,
                      boxShadow: "none",
                      background: "rgba(255,255,255,0.08)",
                      color: "rgba(245,239,232,0.42)",
                    },
                  }}
                >
                  {step === 3 ? "Place order" : "Continue"}
                </Button>
              </Box>
            </Paper>
          </motion.div>

          <Box
            sx={{
              position: { xs: "relative", lg: "sticky" },
              top: { lg: 128 },
              borderRadius: 5,
              p: { xs: 5, md: 7 },
              background: "linear-gradient(180deg, rgba(10,10,12,0.92), rgba(14,14,18,0.99))",
              border: "1px solid rgba(255,255,255,0.09)",
              boxShadow: "0 50px 140px rgba(0,0,0,0.36), inset 0 0 1px rgba(255,255,255,0.03)",
              backdropFilter: "blur(34px)",
              overflow: "hidden",
              minHeight: { xs: "auto", lg: 420 },
              "&::before": {
                content: '""',
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: 2,
                background:
                  "linear-gradient(90deg, rgba(255,244,227,0.92), rgba(255,255,255,0.16))",
                opacity: 0.92,
              },
            }}
          >
            <Typography
              component="h3"
              sx={{ fontSize: "1.2rem", fontWeight: 700, mb: 3, color: "#f5efe8" }}
            >
              Summary
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 3, mt: 1 }}>
              {items.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: 14 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.45, delay: index * 0.06 }}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: "1rem",
                  }}
                >
                  <Typography
                    sx={{
                      color: "rgba(245,239,232,0.85)",
                      fontSize: "0.95rem",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {item.name}
                  </Typography>
                  <Typography sx={{ fontVariantNumeric: "tabular-nums", fontWeight: 600 }}>
                    {formatCurrency(item.price)}
                  </Typography>
                </motion.div>
              ))}
            </Box>
            <Box
              sx={{
                borderTop: "1px solid rgba(255,255,255,0.08)",
                pt: 4,
                mt: 4,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography sx={{ fontSize: "1rem", color: "rgba(245,239,232,0.86)" }}>
                Total
              </Typography>
              <Typography sx={{ fontSize: "1.8rem", fontWeight: 700, letterSpacing: "0.02em" }}>
                {formatCurrency(total)}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

function Field({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  const isFilled = Boolean(value.trim());

  return (
    <Box
      component="label"
      sx={{
        display: "block",
        position: "relative",
        minHeight: 110,
        width: "100%",
        "& .fieldLabel": {
          position: "absolute",
          left: 24,
          top: isFilled ? 12 : 26,
          fontSize: isFilled ? "0.72rem" : "0.82rem",
          letterSpacing: "0.22em",
          color: isFilled ? "#d2b68f" : "rgba(245,239,232,0.62)",
          textTransform: "uppercase",
          transition: "all 0.28s ease",
          pointerEvents: "none",
        },
        "& .fieldInput": {
          width: "100%",
          minHeight: 72,
          borderRadius: 28,
          border: "1px solid rgba(255,255,255,0.1)",
          background: "rgba(255,255,255,0.03)",
          color: "#f5efe8",
          outline: "none",
          padding: "30px 24px 18px",
          fontSize: "0.97rem",
          fontFamily: "inherit",
          transition: "all 0.28s ease",
          boxShadow: "inset 0 0 20px rgba(0,0,0,0.08)",
          "&::placeholder": {
            color: "transparent",
          },
        },
        "&:hover .fieldInput": {
          transform: "translateY(-1px)",
          boxShadow: "0 0 0 1px rgba(255,255,255,0.08)",
        },
        "&:focus-within .fieldInput": {
          borderColor: "rgba(210,182,143,0.72)",
          background: "rgba(255,255,255,0.06)",
          boxShadow: "0 0 0 1px rgba(210,182,143,0.16), 0 0 48px rgba(210,182,143,0.08)",
        },
        "&:focus-within .fieldLabel": {
          top: 12,
          color: "#d2b68f",
          letterSpacing: "0.26em",
        },
      }}
    >
      <Box component="span" className="fieldLabel">
        {label}
      </Box>
      <Box
        component="input"
        type="text"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="fieldInput"
        autoComplete="off"
      />
    </Box>
  );
}
