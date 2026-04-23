/**
 * テスト内容
 * ユーザー管理ができる
 */
import { login, logout } from "./utils";
import { expect, test } from "@playwright/test";

const AuthUserPageUrl = "http://localhost:3000/admin/users";

test("ユーザーを検索する", async ({ page, defaultBrowserType }) => {
  // Arrange
  await login(
    { page, defaultBrowserType },
    {
      email: "admin@example.com",
      password: "adminpass789",
    },
  );
  await page.goto(AuthUserPageUrl);
  await page.waitForURL(AuthUserPageUrl);

  // Assert
  await expect(page.getByText("Taro Yamada")).toBeVisible();
  await expect(page.getByText("Hanako Suzuki")).toBeVisible();

  // Act
  const input = await page.getByTestId("search-input-input");
  const submitButton = await page.getByTestId("search-input-submit-button");

  if (defaultBrowserType === "webkit") {
    // webkitでfillを利用した場合、値が入力されないエラーがあったため、pressSequentiallyで代替
    await input.pressSequentially("Hanako");
  } else {
    await input.fill("Hanako");
  }
  await submitButton.click();

  // Assert
  await expect(page.getByText("Taro Yamada")).not.toBeVisible();
  await expect(page.getByText("Hanako Suzuki")).toBeVisible();

  await logout(page);
});

test("ユーザーを削除する", async ({ page, defaultBrowserType }) => {
  // Arrange
  await login(
    { page, defaultBrowserType },
    {
      email: "admin@example.com",
      password: "adminpass789",
    },
  );
  await page.goto(AuthUserPageUrl);
  await page.waitForURL(AuthUserPageUrl);

  // Act
  const deleteButton = await page.getByTestId("users-list-delete-button-1");
  await deleteButton.click();

  // Assert
  await expect(page.getByText("Taro Yamada")).not.toBeVisible();

  await logout(page);
});
