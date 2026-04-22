import { UsersList } from "@/components/features/users/UsersList";
import { usersMock } from "@/mocks/users";
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";

describe("UsersList", () => {
  test("渡されたデータが正しく表示される", () => {
    // Arrange
    render(<UsersList users={usersMock} onDeleteUser={() => {}} />);

    // Assert
    expect(screen.getByText("Yamada")).toBeInTheDocument();
    expect(screen.getByText("○○部")).toBeInTheDocument();
    expect(screen.getByText("メンバー")).toBeInTheDocument();
    expect(screen.getByText("08000000000")).toBeInTheDocument();
    expect(screen.getByText("user")).toBeInTheDocument();
  });

  test("更新ボタンのリンクが正しく設定される", () => {
    // Arrange
    render(<UsersList users={usersMock} onDeleteUser={() => {}} />);
    const editButtons = screen.getAllByRole("link", { name: "更新" });

    // Assert
    expect(editButtons[0]).toHaveAttribute("href", "/admin/users/1/edit");
  });

  test("削除ボタンがクリックされた時、対象のユーザー情報を引数として関数が発火する", async () => {
    // Arrange
    const deleteUserMock = vi.fn();
    render(<UsersList users={usersMock} onDeleteUser={deleteUserMock} />);
    const deleteButtons = screen.getAllByRole("button", { name: "削除" });

    // Act
    await fireEvent.click(deleteButtons[0]);

    // Assert
    expect(deleteUserMock).toHaveBeenCalledWith(usersMock[0]);
  });

  test("disabledが設定されている場合、削除ボタンが無効になる", () => {
    // Arrange
    render(<UsersList users={usersMock} onDeleteUser={() => {}} disabled />);
    const deleteButtons = screen.getAllByRole("button", { name: "削除" });

    // Assert
    expect(deleteButtons[0]).toHaveAttribute("disabled");
  });
});
